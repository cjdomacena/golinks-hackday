import { useQuery } from "@tanstack/react-query";
import { OrgRepo } from "../lib/types";
import { BASE_URL } from "../lib/constants";
import { RepoCard, RepoCardLoading } from "../components/cards/RepoCard";
import { useState } from "react";
import { BsGrid, BsList } from 'react-icons/bs';


const fetchOrgRepos = async (): Promise<OrgRepo[]> => {

    const res = await fetch(`${BASE_URL}/orgs/Netflix/repos?per_page=20`);
    return res.json();

};

export default function Home() {

    const { data, status } = useQuery({ queryKey: ["netflix"], queryFn: fetchOrgRepos });
    const [orientation, setOrientation] = useState<"grid" | "list">("grid");

    const sortedData = data?.sort((a, b) => b.stargazers_count - a.stargazers_count);
    // const sortedData = data;

    const handleChangeOrientation = (type: "grid" | "list") => {
        setOrientation(type);
    };

    switch (status) {
        case "loading":
            return <div className="container mx-auto p-4  mt-12 space-y-4">
                <div className="flex justify-end">
                    <div className="flex items-center">
                        <button onClick={() => handleChangeOrientation("grid")} className={`p-2 ${orientation === "grid" ? "bg-neutral-800" : "bg-neutral-700"}`}><BsGrid /></button>
                        <button onClick={() => handleChangeOrientation("list")} className={`p-2 ${orientation === "list" ? "bg-neutral-800" : "bg-neutral-700"}`}><BsList /></button>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-bold">Netflix Repositories</h1>
                </div>
                <div className={`grid ${orientation === "grid" ? "grid-cols-[repeat(auto-fill,minmax(280px,1fr))]" : "grid-cols-1"}  gap-4`}>
                    {new Array(10).fill(0).map((_, index) => <RepoCardLoading key={`repo-loader-${index}`} />)}
                </div>
            </div>;
        case "error":
            return <div>Something went wrong...</div>;
        case "success":
            return <div className="container mx-auto p-4  mt-12 space-y-4">

                <div className="flex justify-end">
                    <div className="flex items-center">
                        <button onClick={() => handleChangeOrientation("grid")} className={`p-2 ${orientation === "grid" ? "bg-slate-800" : "bg-slate-700"}`}><BsGrid /></button>
                        <button onClick={() => handleChangeOrientation("list")} className={`p-2 ${orientation === "list" ? "bg-slate-800" : "bg-slate-700"}`}><BsList /></button>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-bold">Netflix Repositories</h1>
                </div>
                <div className={`grid ${orientation === "grid" ? "grid-cols-[repeat(auto-fill,minmax(280px,1fr))]" : "grid-cols-1"}  gap-4`}>
                    {sortedData ? sortedData.map((repo) => <RepoCard {...repo} key={repo.id} />) : <p>No repositories available.</p>}
                </div>

            </div>;
    }
    return <div></div>;
}