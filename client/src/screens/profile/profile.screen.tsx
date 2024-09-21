export const ProfileScreen = () => {
    return (
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
            <div className="mx-auto max-w-6xl">
                <div className="mt-4 lg:mt-8">
                    {/* Profile image and name */}
                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src="/path/to/profile-image.jpg"
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>
                            <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">John Doe</h1>
                            <p className="text-zinc-500 dark:text-zinc-400">@language_lover_123</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">User Profile</h1>
                        <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                            Active
                        </span>
                    </div>
                    
                    <div className="mt-12">
                        <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Learning Summary</h2>
                        <hr className="mt-4 w-full border-t border-zinc-950/10 dark:border-white/10" />
                        <dl className="grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,theme(spacing.80))_auto] sm:text-sm/6">
                            <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
                                Current Language
                            </dt>
                            <dd className="pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none">
                                Spanish
                            </dd>
                            <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
                                Current Level
                            </dt>
                            <dd className="pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none">
                                Intermediate
                            </dd>
                            <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
                                XP Points
                            </dt>
                            <dd className="pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none">
                                5,280
                            </dd>
                            <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
                                Daily Streak
                            </dt>
                            <dd className="pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none">
                                42 days
                            </dd>
                        </dl>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Account Details</h2>
                        <hr className="mt-4 w-full border-t border-zinc-950/10 dark:border-white/10" />
                        <dl className="grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,theme(spacing.80))_auto] sm:text-sm/6">
                            <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
                                Username
                            </dt>
                            <dd className="pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none">
                                language_lover_123
                            </dd>
                            <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
                                Email
                            </dt>
                            <dd className="pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none">
                                user@example.com
                            </dd>
                            <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
                                Account Type
                            </dt>
                            <dd className="pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none">
                                Premium
                            </dd>
                            <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
                                Member Since
                            </dt>
                            <dd className="pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none">
                                January 15, 2023
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};