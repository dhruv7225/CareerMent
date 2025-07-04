import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useState } from "react";

import UserCard from "../../components/UserCard";

const FindMentorPage = () => {
    const [search, setSearch] = useState({ name: "", skills: "" });
    const { data: mentors, refetch } = useQuery({
        queryKey: ["mentors", search],
        queryFn: async () => {
			
            const { name, skills } = search;
            const params = new URLSearchParams();
            if (name) params.append("name", name);
			
            if (skills) params.append("skills", skills);
			
			const data = await axiosInstance.get(`/mentors/search?${params.toString()}`);	
            return data
        },
        enabled: false,
    });

    const handleSearch = () => {
        refetch();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl text-black font-bold">Find a Mentor</h1>
            <div className="flex gap-4 mt-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="input input-bordered"
                    value={search.name}
                    onChange={(e) => setSearch({ ...search, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Search by skills"
                    className="input input-bordered"
                    value={search.skills}
                    onChange={(e) => setSearch({ ...search, skills: e.target.value })}
                />
                <button onClick={handleSearch} className="btn text-2xl btn-secondary">
                    Search
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

			   {
				mentors &&
				mentors.data.map((mentor,index)=>(	
					<UserCard user={mentor} key={index} isConnection={false} isShowButton={false} />
					)
				)
				}
								
            </div>
        </div>
    );
};

export default FindMentorPage;