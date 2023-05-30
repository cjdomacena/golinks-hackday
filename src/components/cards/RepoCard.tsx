import { OrgRepo } from "../../lib/types";
import { AiFillStar, AiOutlineFork } from 'react-icons/ai';
import { ReactNode } from "react";
import { Link } from "react-router-dom";
type RepoCardProps = OrgRepo;

const RepoBadge = ({ text, icon }: { text: string, icon: ReactNode; }) => {
    return <div className="flex items-center gap-1">
        {icon}
        <p>{text}</p>
    </div>;
};

export const RepoCard = ({ full_name, description, stargazers_count, forks_count, created_at, owner, name, default_branch, language }: RepoCardProps) => {

    return <div className="bg-slate-800 p-4 rounded flex flex-col justify-between gap-6">
        <div className="space-y-3">
            <div className="flex gap-4">
                <RepoBadge icon={<AiFillStar />} text={String(stargazers_count)} />
                <RepoBadge icon={<AiOutlineFork />} text={String(forks_count)} />
            </div>
            <Link to={`${owner.login}/${name}/${default_branch}`}><h4 className="text-lg font-bold leading-relaxed mt-2">{full_name}</h4></Link>
            <p className="line-clamp-3 text-sm text-neutral-300">{description}</p>
            {language ? <p>{language}</p> : null}
        </div>


        <p>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(created_at))}</p>

    </div>;

};

export const RepoCardLoading = () => {

    return <div className="w-full h-[200px] bg-slate-800 animate-pulse rounded">


    </div>;
};