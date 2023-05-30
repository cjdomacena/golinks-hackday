import { BsCircle } from "react-icons/bs";
import { RepoCommit } from "../../lib/types/commits";
import { BiCheck, BiCopy, BiGitCommit } from 'react-icons/bi';
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import { useState } from "react";


interface CommitCardProps {

    [key: string]: RepoCommit[];

}

export const CommitCard = ({ props }: { props: CommitCardProps; }) => {
    console.log(props);
    return <div>

        {Object.keys(props).map((key: string) => <div key={key} className=" relative">
            <div className="h-2 border-l border-l-slate-700" />
            <BiGitCommit className="absolute -left-[7.3px] top-[13px] w-4 h-4 text-slate-500"
            />
            <p className=" pl-4">Commits on {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(key))}</p>
            <div className="relative py-4 border-l border-l-slate-700">


                <div className="">

                    <div className=" rounded ml-4 border border-slate-700">
                        {props[key].map((commit) => <CommitCardItems {...commit} key={commit.node_id} />)}
                    </div>
                </div>
            </div>
        </div>)}
    </div>;

};

export const CommitCardItems = ({ sha, commit: { message, author: { date } }, author: { login, avatar_url } }: RepoCommit) => {

    const [copied, setCopied] = useState(false);

    return <div className=" p-3 border-b border-slate-700 w-full hover:bg-slate-700 transition-colors">
        <div className="flex gap-2 justify-between  items-center w-full">
            <div className="max-w-md w-full space-y-2">
                <h4 className="max-w-md truncate  font-semibold text-sm">{message}</h4>
                <div className="flex gap-1 items-center">
                    <img src={avatar_url} width={25} height={25} className="rounded-full" />
                    <p>{login}</p>
                    <p className="text-xs">committed {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "medium" }).format(new Date(date))}</p>
                </div>
            </div>
            <div className="flex gap-2 bg-slate-800 rounded border border-slate-700 ">
                <button className="px-4 border-r border-r-slate-700" onClick={() => {
                    navigator.clipboard.writeText(sha);
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 1000);
                }}>

                    {copied ? <AiOutlineCheck className="text-green-500" /> : <BiCopy />}
                </button>
                <p className="text-xs py-2   px-4 rounded text-blue-500">{sha.slice(0, 5)}</p>
            </div>

        </div>
    </div>;
};

