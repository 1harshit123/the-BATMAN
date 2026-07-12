import projects from "./projectsData.json";

const projectList = document.querySelector(".project-list");
const template = document.querySelector("#project-template");

export function renderProjects() {

    projectList.innerHTML = "";

    projects
        .sort((a, b) => a.order - b.order)
        .forEach((project, index) => {

            const clone = template.content.cloneNode(true);

            // Index
            clone.querySelector(".project-index").textContent =
                String(index + 1).padStart(2, "0");

            // Image
            const image = clone.querySelector(".project-image");
            image.src = project.image;
            image.alt = project.title;

            // Title
            clone.querySelector("h3").textContent = project.title;

            // Description
            clone.querySelector("p").textContent =
                project.description || "No description available.";

            // Link
            const link = clone.querySelector(".project-link");
            link.href = project.homepage || project.github;

            // Tags
            const tags = clone.querySelector(".project-tags");
            tags.innerHTML = "";

            if (project.language) {
                const span = document.createElement("span");
                span.textContent = project.language;
                tags.appendChild(span);
            }

            project.technologies.forEach((tech) => {
                const span = document.createElement("span");
                span.textContent = tech;
                tags.appendChild(span);
            });

            projectList.appendChild(clone);

        });

}

renderProjects();