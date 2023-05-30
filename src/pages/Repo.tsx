

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

const fetchCommits = async ({ owner, repoName }: { owner: any, repoName: any; }): Promise<RepoCommit[]> => {
    const res = await fetch(`${BASE_URL}/repos/${owner}/${repoName}/commits`);
    return res.json();
};

export default function Repo() {

    let { owner, repoName } = useParams();
    const { data, status } = useQuery([owner, repoName], () => fetchCommits({ owner, repoName }));

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
                <div className="space-y-4 w-3/4 mx-auto">
                    <CommitCard props={groupedCommits} />
                    {/* {data ? data.map((commit) => <CommitCard {...commit} />) : <p>Not found</p>} */}
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