const USERNAME = "1harshit123";
import fs from "fs/promises";

export async function fetchRepoDetails(repoName) {

    const response = await fetch(
        `https://api.github.com/repos/${USERNAME}/${repoName}`
    );

    if (!response.ok) {
        throw new Error(`Repository "${repoName}" not found.`);
    }

    const repo = await response.json();

    return {
        title: repo.name,
        description: repo.description,
        github: repo.html_url,
        homepage: repo.homepage,
        technologies: repo.topics,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        updated: repo.updated_at,
    };
}

const repoList = ["RateGuard", "code-explainer-RAG-system"]

let projects = []
for (let repo of repoList){
    const details = await fetchRepoDetails(repo)

    projects.push({
        ...details,

        // Manual fields you can edit later
        image: `./assets/projects/${repo}.png`,
        featured: false,
        order: projects.length + 1
    });


}

const OUTPUT = "projectsData.json"

await fs.writeFile(OUTPUT, JSON.stringify(projects, null, 2));
console.log(`✅ ${OUTPUT} generated`)