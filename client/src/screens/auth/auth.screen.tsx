import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import QRCode from "react-qr-code"
import DuoBird from "@/assets/duolingo-bird.gif"
import { ReclaimModal } from "./reclaim-modal.component"
import { Reclaim } from '@reclaimprotocol/js-sdk';
import { Loader2 } from "lucide-react"
import { useState } from "react"

export function AuthScreen() {

    const [requestUrl, setRequestUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const getVerificationReq = async () => {
       try{
        setIsLoading(true)
        const APP_ID = "0xa3ec56fF644A54f06A2A35ff7f62F4464d7b71e1";
        const reclaimClient = new Reclaim.ProofRequest(APP_ID);
        const providerIds = [
        'c7003b77-4e57-4c62-a9fc-39d8bb680e84', // Duolingo Achievements - Koushith - Eth-SG
        ];
        await reclaimClient.buildProofRequest(providerIds[0], false, "V2Linking")
        const APP_SECRET ="0xf296c5c9ad8e908bf5ca9d843caf9bcc370633e120965d1defdcac22476d50b4"  // your app secret key.
        reclaimClient.setSignature(
            await reclaimClient.generateSignature(APP_SECRET)
        )
        const { requestUrl, statusUrl } =
          await reclaimClient.createVerificationRequest()
        console.log("requestUrl", requestUrl)
        setIsLoading(false)
        setRequestUrl(requestUrl)
        await reclaimClient.startSession({
          onSuccessCallback: proof => {
            console.log('Verification success', proof)
            // Parse the proof object to extract Duolingo achievements
            const proofObj = proof[0];
            const parameters = JSON.parse(proofObj.claimData.parameters);
            const achievementsString = parameters.paramValues.achievements;
            
            // Parse the achievements string to extract individual achievements
            const achievements = achievementsString.split('},{').map((achievement: string) => {
              const nameMatch = achievement.match(/"name":"([^"]+)"/);
              const countMatch = achievement.match(/"count":(\d+)/);
              return {
                name: nameMatch ? nameMatch[1] : '',
                count: countMatch ? parseInt(countMatch[1]) : 0
              };
            });

            console.log('Parsed Duolingo achievements:', achievements);

            // You can now use the 'achievements' array for further processing or display
            // For example, you might want to update the state with these achievements
            // setDuolingoAchievements(achievements);
            // Your business logic here
          },
          onFailureCallback: error => {
            console.error('Verification failed', error)
            // Your business logic here to handle the error
          }
        })
       } catch (error) {
        console.error('Error fetching verification request', error)
       }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardContent className="pt-6 flex flex-col items-center">
          <img src={DuoBird} alt="Duolingo Bird" className="w-24 h-24 mb-6" />
          <ReclaimModal buttonText="Import Duolingo Data">
            <div className="flex flex-col items-center space-y-4">
              <img src={DuoBird} alt="Duolingo Bird" className="w-16 h-16" />
              {requestUrl && <QRCode value={requestUrl as string} />}
              <p>Scan this QR code to verify</p>
              <p>OR if you are on mobile, click the button below to verify</p>
              <Button onClick={getVerificationReq}>Verify using Reclaim</Button>
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            </div>
          </ReclaimModal>


        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Powered by Reclaim
        </CardFooter>
      </Card>
    </div>
  )
}