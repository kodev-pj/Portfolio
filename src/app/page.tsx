// page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import "../styles/main.module.css";

export default function Home() {
  const [showAbout, setShowAbout] = useState(true);
  const [visibleAbout, setVisibleAbout] = useState(true);
  const [showEducation, setShowEducation] = useState(true);
  const [visibleEducation, setVisibleEducation] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [visibleSkills, setVisibleSkills] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(true);
  const projects = [
    {
      name: "Surgical Log",
      summary:
        "手術記録アプリ（卒業研究・制作）（iPadOS）",
      type: "personal",
    },
    {
      name: "Pets Health",
      summary:
        "ペットの健康状態の記録・管理アプリ（iOS）",
      type: "personal",
    },
    {
      name: "Analyze Documents",
      summary:
        "PDFからAIでテキスト抽出→CSV生成（Web）",
      type: "team",
    },
    {
      name: "NOIR",
      summary:
        "ファッションSNSアプリ（iOS）",
      type: "team",
    },
  ];

  const [selectedProject, setSelectedProject] = useState<null | { name: string; summary: string }>(null);
  const [filter, setFilter] = useState<"all" | "personal" | "team">("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.type === filter;
  });

  const openProject = (project: { name: string; summary: string }) => {
    setSelectedProject(project);
    setTimeout(() => {
      const detail = document.getElementById("project-detail");
      detail?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const clearProject = () => {
    const detail = document.getElementById("project-detail");
    if (detail) {
      detail.classList.add("project-detail-exit");
      setTimeout(() => {
        setSelectedProject(null);
        const projects = document.getElementById("projects");
        projects?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      setSelectedProject(null);
    }
  };

  return (
    <main className="container flex">


      <div className="content flex-1" style={{ maxWidth: "100%" }}>
        

        <section className="block" data-observe id="about">
          <h2
            className="block-title cursor-pointer select-none"
            onClick={() => {
              if (showAbout) {
                setVisibleAbout(false);
                setTimeout(() => setShowAbout(false), 300);
              } else {
                setShowAbout(true);
                setTimeout(() => setVisibleAbout(true), 10);
              }
            }}
          >
            About Me {showAbout ? "▲" : "▼"}
          </h2>
          {showAbout && (
            <p className={`block-text ${visibleAbout ? "toggle-content" : "toggle-exit"}`}>
              ⚪︎ 2003年3月23日生まれ
              <br />
              ⚪︎ 東京国際工科専門職大学 | 工科学部・情報工学科に在学中  
              <br />
              ⚪︎ iOSアプリやWebアプリの開発、医療ITに関心  
              <br />
              ⚪︎ SwiftUI、Next.js、Javaを使ったモバイルアプリ、Webアプリの開発経験あり。 
              <br/> 
              ⚪︎ 🇯🇵 🇨🇳 🇰🇷
            </p>
          )}
        </section>

        <section className="block">
          <h2
            className="block-title cursor-pointer select-none"
            onClick={() => {
              if (showEducation) {
                setVisibleEducation(false);
                setTimeout(() => setShowEducation(false), 300);
              } else {
                setShowEducation(true);
                setTimeout(() => setVisibleEducation(true), 10);
              }
            }}
          >
            Education {showEducation ? "▲" : "▼"}
          </h2>
          {showEducation && (
            <>
              <ul className={`block-text list-disc ml-6 ${visibleEducation ? "toggle-content" : "toggle-exit"}`}>
                <li>2020年7月：延辺IT技工学校 卒業</li>
                <li>2022年4月：東京国際工科専門職大学 入学</li>
                <li>2026年3月：東京国際工科専門職大学 卒業見込み</li>
              </ul>
              <h2
                className="block-title mt-6 cursor-pointer select-none"
                onClick={() => {
                  if (showEducation) {
                    setVisibleEducation(false);
                    setTimeout(() => setShowEducation(false), 300);
                  } else {
                    setShowEducation(true);
                    setTimeout(() => setVisibleEducation(true), 10);
                  }
                }}
                style={{ fontSize: "1.1em" }}
              >
                Licenses & Certifications
              </h2>
              {showEducation && (
                <ul className={`block-text list-disc ml-6 ${visibleEducation ? "toggle-content" : "toggle-exit"}`}>
                  <li>2023年8月：普通自動車第一種運転免許（AT限定）取得</li>
                  <li>2025年2月：産業用ロボットの教示等の業務に係る特別教育 修了</li>
                </ul>
              )}
            </>
          )}
        </section>

        <section className="block" data-observe id="skills">
          <h2
            className="block-title cursor-pointer select-none"
            onClick={() => {
              if (showSkills) {
                setVisibleSkills(false);
                setTimeout(() => setShowSkills(false), 300);
              } else {
                setShowSkills(true);
                setTimeout(() => setVisibleSkills(true), 10);
              }
            }}
          >
            Skills {showSkills ? "▲" : "▼"}
          </h2>
          {showSkills && (
            <div className={`skills-list ${visibleSkills ? "toggle-content" : "toggle-exit"}`}>
              <div>
                <h3 className="text-base font-medium mb-1 text-gray-800">Languages</h3>
                <ul className="text-sm text-gray-600 list-disc ml-5">
                  <li>Swift</li>
                  <li>Java</li>
                  <li>HTML / CSS</li>
                  <li>JavaScript / TypeScript</li>
                  <li>Python</li>
                  <li>C / C++</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-gray-800">Frameworks / Libraries</h3>
                <ul className="text-sm text-gray-600 list-disc ml-5">
                  <li>SwiftUI</li>
                  <li>Next.js / React</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-gray-800">Tools / IDEs</h3>
                <ul className="text-sm text-gray-600 list-disc ml-5">
                  <li>Xcode</li>
                  <li>VS Code</li>
                  <li>Eclipse</li>
                  <li>Photoshop / Illustrator</li>
                  <li>Figma</li>
                  <li>GCP</li>
                  <li>Git / GitHub</li>
                </ul>
              </div>
            </div>
          )}
        </section>

        <section className="block" data-observe id="projects">
          <h2
            className="block-title cursor-pointer select-none"
            onClick={() => {
              if (showProjects) {
                setVisibleProjects(false);
                setTimeout(() => setShowProjects(false), 300);
              } else {
                setShowProjects(true);
                setTimeout(() => setVisibleProjects(true), 10);
              }
            }}
          >
            Projects {showProjects ? "▲" : "▼"}
          </h2>
          {showProjects && (
            <div className={`${visibleProjects ? "toggle-content" : "toggle-exit"}`}>
              <div className="mb-4">
                <div className="flex gap-2 mt-2">
                  <button className={`filter-button ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
                  <button className={`filter-button ${filter === "personal" ? "active" : ""}`} onClick={() => setFilter("personal")}>Personal</button>
                  <button className={`filter-button ${filter === "team" ? "active" : ""}`} onClick={() => setFilter("team")}>Team</button>
                </div>
              </div>
              <div className="project-list grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    className="project-card cursor-pointer"
                    onClick={() => openProject(project)}
                  >
                    <div className="project-name flex items-center justify-between w-full">
                      <span>{project.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {selectedProject && (
          <section id="project-detail" className="project-detail block fade-in">
            <h3 className="text-xl font-semibold mb-2">{selectedProject.name}</h3>
            <p className="mb-4">{selectedProject.summary}</p>
            <button
              onClick={clearProject}
              className="text-sm underline text-blue-500 hover:text-blue-700"
            >
              Back
            </button>
          </section>
        )}
      </div>

      <aside className="sidebar">
        <div className="profile-card">
          <h3>
            <ruby>
              黄　一田<rp>（</rp><rt>こう　いちだ</rt><rp>）</rp>
            </ruby>
          </h3>
          <p>東京国際工科専門職大学</p>
          <p>工科学部 / 情報工学科</p>
          <p>生年月日：2003年3月23日</p>
          <hr />
          <p className="small">iOS・Webアプリ開発、医療IT</p>
          <div className="social-links">
            <a href="https://github.com/zweidrei4c2" target="_blank" rel="noopener noreferrer">
              <Image src="/image/github-mark.png" alt="GitHub" width={16} height={16} className="inline mr-2" />
              GitHub
            </a>
            <a href="mailto:zweidrei4c2@icloud.com" className="email-link">
              <Image src="/image/mail.png" alt="Email" width={16} height={16} className="inline mr-2" />
              Email
            </a>
          </div>
        </div>
      </aside>
    </main>
  );
}