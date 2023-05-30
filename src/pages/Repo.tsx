

/** Url strcuture for getting commits
 *  repos/OrgName?/repoName/commits/default_branch
 * e.g. (https://api.github.com/repos/Netflix/go-iomux/commits/main)
 * OrgName (owner: {login})
 * repoName: name
 * default_branch: default_branch
 */

import { useParams } from "react-router-dom";
import { RepoCommit } from "../lib/types/commits";
import { BASE_URL } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { CommitCard } from "../components/cards/CommitCard";
import { useState } from "react";

const fetchCommits = async ({ owner, repoName, page }: { owner: any, repoName: any; page: number; }): Promise<RepoCommit[]> => {
    const res = await fetch(`${BASE_URL}/repos/${owner}/${repoName}/commits?page=${page}`);
    return res.json();
};

export default function Repo() {
    const [page, setPage] = useState(1);
    let { owner, repoName } = useParams();
    const { data, status } = useQuery([owner, repoName, page], () => fetchCommits({ owner, repoName, page }));

    const groupedCommits = groupCommits(data);

    switch (status) {
        case "loading":
            return <div>Loading...</div>;
        case "error":
            return <div>Something went wrong...</div>;
        case "success":
            return <div className="container mx-auto mt-12 space-y-4">
                <div>
                    <h1 className="text-4xl">{owner}/{repoName} </h1>
                    <p>Commit history</p>
                </div>
                <div className="space-y-4  2xl:w-3/4 xl:w-3/4 lg:w-3/4 w-full mx-auto">
                    {groupCommits !== null ? <CommitCard props={groupedCommits} /> : <p>Data not available</p>}
                    {/* {data ? data.map((commit) => <CommitCard {...commit} />) : <p>Not found</p>} */}

                    <div className="space-x-4 py-4">
                        {page > 1 ? <button onClick={() => setPage(prev => prev - 1)}>Previous Page</button> : null}
                        <button onClick={() => setPage(prev => prev + 1)}>Next Page</button>
                    </div>
                </div>

            </div>;
    }
}

function groupCommits(data: RepoCommit[] | undefined) {
    if (data) {
        const grouped: any = {};
        data.forEach(commit => {
            const { commit: { author: { date } } } = commit;
            const formattedDate = date.split("T")[0];
            if (grouped[formattedDate]) {
                grouped[formattedDate].push(commit);
            } else {
                grouped[formattedDate] = [commit];
            }
        });

        return grouped;
    }
    return undefined;
}