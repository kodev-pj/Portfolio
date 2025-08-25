// page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import "../styles/main.module.css";

type Project = {
  name: string;
  type: "personal" | "team";
  overview?: string;
  background?: string;
  problem?: string;
  role?: string;
  approach?: string;
  outcome?: string;
  learnings?: string;
  github?: string;
};

export default function Home() {
  const [showAbout, setShowAbout] = useState(true);
  const [visibleAbout, setVisibleAbout] = useState(true);
  const [showEduExp, setShowEduExp] = useState(true);
  const [visibleEduExp, setVisibleEduExp] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [visibleSkills, setVisibleSkills] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(true);
  const projects: Project[] = [
    {
      name: "Surgical Log",
      type: "personal",
      overview:
        "卒業研究として開発中のiPadアプリ。紙・手描きに頼りがちな手術記録を、3Dモデルを用いて迅速かつ一貫した記録に置き換える。術後レビューの共通理解を上げつつ、入力時間の短縮を狙う。",
      background:
        "医療分野のデジタル化が進む一方で、手術記録は依然として紙と手描きが中心な病院が多く、記録品質や共有時の解釈のばらつきが課題。導入容易性の観点からiPadを採用し、記録時の負担軽減、入力効率と可視化の一貫性向上を目指した。",
      problem:
        "・記録に時間を要し、術後レビュー時に処置部位・内容の共有が困難\n・手描き表現の個人差により再利用性が低い",
      role:
        "個人開発。課題整理、要件定義、UI設計、ワイヤーフレーム設計、SwiftUIによるプロトタイプ開発。",
      approach:
        "2026年1月追記予定",
      outcome:
        "2026年1月追記予定",
      learnings:
        "2026年1月追記予定",
    },
    {
      name: "Analyze Documents",
      type: "team",
      overview:
        "3年後期から4年前期にかけて行なった実習で、連携企業の業務利用を想定して制作したWebアプリ。Next.jsで構築し、PDFをアップロードするとAI（Gemini）が必要情報をテキスト化し、結果を画面で確認してCSVとしてダウンロードするまでの工程をブラウザ内で完結。実運用を見据えたワークフロー設計により、大量の書類転記を効率化し、ヒューマンエラーの低減を狙った。",
      background:
        "連携企業の現場ではPDFベースの書類転記が毎月数万件あり、全て人手で行なっていたため、作業負荷とヒューマンエラーが課題となっていた。ブラウザで完結させることにより処理の標準化と効率化を目指した。",
      problem:
        "・数万件の書類を人手で処理しているため人的負担が大きい\n・フォーマットが統一されていない\n・ヒューマンエラーが発生",
      role:
        "フロントエンド全般を担当。UI/UXデザインから機能の実装を行なった。",
      approach:
        "・アップロード：拡張子/サイズ検証、ドラッグ＆ドロップ\n・結果整形：テキスト抽出結果のテーブル表示、抽出テキストが場合によって全角/半角が混在するためtoHalfWidthを用いて半角に統一\n・CSV出力：抽出値に実行日時・ログイン者名（担当者）を付与\n・認証/運用：NextAuth.jsによるMicrosoft OAuth、未ログイン時の操作制限、無操作30分で自動ログアウト",
      outcome:
        "・課題であった業務負担を軽減できるWebアプリとして完成。\n・ログイン → アップロード → 結果確認 → CSVダウンロードの一連フローを実現\n・初見でも迷いにくいUI/UX\n・拡張子・サイズ・多ファイルなど運用上の抜け漏れをレビュー段階で解消",
      learnings:
        "・Next.js/Reactの理解\n・認証機能の実装方法\n・UI設計から実装まで一貫して行うことで、利用者視点の重要性を実感\n・チーム内での役割分担やレビューの重要性\n・限られた期間で成果物をまとめ上げる進め方",
      github: "https://github.com/kodev-pj/Analysis-Documents",
    },
  ];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | "personal" | "team">("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.type === filter;
  });

  const openProject = (project: Project) => {
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
              2003年3月23日生まれ
              <br />
              東京国際工科専門職大学 工科学部 情報工学科 4年次在学中  
              <br />
              iOSアプリやWebアプリの開発、医療ITに関心  
              <br />
              SwiftUI、Next.js、Javaを使ったモバイルアプリ、Webアプリの開発経験あり 
              <br/> 
              🇯🇵 ネイティブ / 🇨🇳 日常会話レベル / 🇰🇷 日常会話レベル
            </p>
          )}
        </section>

        <section className="block">
          <h2
            className="block-title cursor-pointer select-none"
            onClick={() => {
              if (showEduExp) {
                setVisibleEduExp(false);
                setTimeout(() => setShowEduExp(false), 300);
              } else {
                setShowEduExp(true);
                setTimeout(() => setVisibleEduExp(true), 10);
              }
            }}
          >
            Education・Experience・Licenses {showEduExp ? "▲" : "▼"}
          </h2>
          {showEduExp && (
            <div className={`${visibleEduExp ? "toggle-content" : "toggle-exit"}`}>
              <div>
                <h3 className="mt-2 mb-2 font-semibold">Education</h3>
                <ul className="block-text ml-0">
                  <li className="mb-1">
                    <div className="text-sm text-gray-500">2020年7月</div>
                    <div>延辺IT技工学校（中国・吉林） 卒業</div>
                  </li>
                  <li className="mb-1">
                    <div className="text-sm text-gray-500">2022年4月</div>
                    <div>東京国際工科専門職大学 入学</div>
                  </li>
                  <li>
                    <div className="text-sm text-gray-500">2026年3月</div>
                    <div>東京国際工科専門職大学 卒業見込み</div>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="mt-2 mb-2 font-semibold">Experience</h3>
                <ul className="block-text ml-0">
                  <li className="mb-3">
                    <div className="text-sm text-gray-500">2024年10月〜11月</div>
                    <div><strong>株式会社アーキテクトコア</strong><br />社内向けWebシステムの改修を担当。既存機能のバグ修正から新機能の追加を行なった。</div>
                  </li>
                  <li>
                    <div className="text-sm text-gray-500">2025年6月〜現在</div>
                    <div><strong>InnoJin株式会社</strong><br />iOSネイティブアプリのリニューアル開発を中心に、UI/UX改善や機能実装を担当。記事作成、海外事業のリサーチなども。</div>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="mt-2 mb-2 font-semibold">Licenses &amp; Certifications</h3>
                <ul className="block-text ml-0">
                  <li className="mb-2">
                    <div className="text-sm text-gray-500">2023年8月</div>
                    <div>普通自動車第一種運転免許（AT限定）</div>
                  </li>
                  <li>
                    <div className="text-sm text-gray-500">2025年2月</div>
                    <div>産業用ロボットの教示等の業務に係る特別教育</div>
                  </li>
                </ul>
              </div>
            </div>
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
                setSelectedProject(null);
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
            <h3 className="text-xl font-semibold mb-3">{selectedProject.name}</h3>

            {selectedProject.overview && (
              <>
                <h4 className="text-base font-semibold mt-2 mb-1">概要</h4>
                <p className="mb-3 whitespace-pre-line">{selectedProject.overview}</p>
              </>
            )}

            <h4 className="text-base font-semibold mt-2 mb-1">背景</h4>
            <p className="mb-3 whitespace-pre-line">{selectedProject.background}</p>

            <h4 className="text-base font-semibold mt-2 mb-1">課題</h4>
            <p className="mb-3 whitespace-pre-line">{selectedProject.problem}</p>

            <h4 className="text-base font-semibold mt-2 mb-1">役割</h4>
            <p className="mb-3 whitespace-pre-line">{selectedProject.role}</p>

            <h4 className="text-base font-semibold mt-2 mb-1">工夫ポイント / アプローチ</h4>
            <p className="mb-3 whitespace-pre-line">{selectedProject.approach}</p>

            <h4 className="text-base font-semibold mt-2 mb-1">成果</h4>
            <p className="mb-3 whitespace-pre-line">{selectedProject.outcome}</p>

            <h4 className="text-base font-semibold mt-2 mb-1">学び</h4>
            <p className="mb-4 whitespace-pre-line">{selectedProject.learnings}</p>

            {selectedProject.github && (
              <p className="mb-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  https://github.com/kodev-pj/Analysis-Documents
                </a>
              </p>
            )}

            <button
              onClick={clearProject}
              className="text-sm underline text-blue-500 hover:text-blue-700"
            >
              Close
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
          <p className="small">iOS・Webアプリ開発</p>
          <div className="social-links">
            <a href="https://github.com/kodev-pj" target="_blank" rel="noopener noreferrer">
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