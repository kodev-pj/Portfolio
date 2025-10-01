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
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
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
        "3年後期〜4年前期のソリューション開発実習で、連携企業の実務利用を想定して作ったWebアプリ。\nNext.jsで構築し、PDFのアップロード→AI（Gemini）でテキスト化→画面で確認→CSVでダウンロード、までをブラウザ内で完結。大量の転記作業を減らし、ミスを抑える。\n以下がWebアプリのUIと簡易的なシステム構成図である。",
      background:
        "現場ではPDFの内容を人手で転記しており、件数が多く作業負担と入力ミスが問題だった。ブラウザだけで回るワークフローを用意し、処理の標準化と効率化を狙った。",
      problem:
        "・人手の転記に時間とコストがかかる\n・全角/半角や記号差など書式の揺れで整合性が崩れる\n・権限管理や監査の観点から、認証とセッション管理が必要",
      role:
        "フロントエンドを担当。UI設計、ページ作成、認証、結果表示、CSV出力まで一通りを実装。",
      approach:
        "・アップロード：複数PDF、拡張子/サイズ検証、ドラッグ＆ドロップ\n・結果表示：テーブル化、toHalfWidthで表記ゆれを正規化\n・CSV出力：抽出結果に実行日時・ログイン者名を付与\n・認証/運用：NextAuth.js（Microsoft OAuth）、未ログイン操作のブロック、無操作30分で自動サインアウト",
      outcome:
        "・ログイン→アップロード→確認→CSVのフローを一本化\n・デスクトップ前提のUIで初見でも迷いにくい操作感\n・拡張子/サイズ/多ファイルやセッション管理など運用要件を満たす形に整理",
      learnings:
        "・Next.jsの基礎（ルーティング、SSR/CSRの使い分け、型設計）\n・NextAuth.jsでの認証/セッション管理と自動サインアウト\n・UI設計→実装→検証を通じて、作業動線を優先して決める重要性\n・役割分担とPRレビューの早回しで品質と速度を両立\n・期限内に仕上げるためのスコープ管理と優先度の付け方",
      github: "https://github.com/kodev-pj/Analysis-Documents",
    },
  ];

  const [openProjectNames, setOpenProjectNames] = useState<string[]>([]);
  const [filter, setFilter] = useState<"all" | "personal" | "team">("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.type === filter;
  });

  const openProject = (project: Project) => {
    const name = project.name;
    setOpenProjectNames((prev) => {
      const isOpen = prev.includes(name);
      const next = isOpen ? prev.filter((n) => n !== name) : [...prev, name];
      // Scroll the project card into view after layout updates
      setTimeout(() => {
        const el = document.getElementById(`project-card-${name.replace(/\s+/g, "-").toLowerCase()}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return next;
    });
  };

  const clearProject = (target: Project) => {
    setOpenProjectNames((prev) => prev.filter((n) => n !== target.name));
  };

  const openImage = (src: string) => {
    setImageSrc(src);
    setIsImageOpen(true);
  };

  const closeImage = () => {
    setIsImageOpen(false);
    setTimeout(() => setImageSrc(null), 200);
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
              2003年生まれ
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
                    <div className="text-sm text-gray-500">2025年6月〜現在</div>
                    <div><strong>InnoJin株式会社</strong><br />iOSネイティブアプリのリニューアル開発を中心に、UI/UX改善や機能実装を担当。記事作成、海外事業のリサーチなども。</div>
                  </li>
                  <li>
                    <div className="text-sm text-gray-500">2024年10月〜11月</div>
                    <div><strong>株式会社アーキテクトコア</strong><br />社内向けWebシステムの改修を担当。既存機能のバグ修正から新機能の追加を行なった。</div>
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
                  <li>HTML / CSS</li>
                  <li>JavaScript</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-gray-800">Frameworks / Libraries</h3>
                <ul className="text-sm text-gray-600 list-disc ml-5">
                  <li>SwiftUI</li>
                  <li>Next.js / React</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-gray-800">Tools / IDEs</h3>
                <ul className="text-sm text-gray-600 list-disc ml-5">
                  <li>Xcode</li>
                  <li>VS Code</li>
                  <li>Photoshop / Illustrator</li>
                  <li>Git / GitHub</li>
                </ul>
              </div>
            </div>
          )}
          {/* Experienced Technologys section */}
          {showSkills && (
            <div className="mt-6">
              <h3 className="text-base font-medium mb-2 text-gray-800">Experienced Technologys</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-semibold mb-1 text-gray-700">Languages</h4>
                  <ul className="text-sm text-gray-600 list-disc ml-5">
                    <li>Java</li>
                    <li>TypeScript</li>
                    <li>Python</li>
                    <li>C / C++</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1 text-gray-700">Frameworks / Libraries</h4>
                  <ul className="text-sm text-gray-600 list-disc ml-5">
                    <li>Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1 text-gray-700">Tools / IDEs</h4>
                  <ul className="text-sm text-gray-600 list-disc ml-5">
                    <li>Eclipse</li>
                    <li>Figma</li>
                    <li>GCP</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="block" data-observe id="projects">
          <h2
            className="block-title cursor-pointer select-none"
            onClick={() => {
              if (showProjects) {
                setOpenProjectNames([]);
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
              <div className="project-list flex flex-col gap-6">
                {filteredProjects.map((project, index) => {
                  const isOpen = openProjectNames.includes(project.name);
                  const cardId = `project-card-${project.name.replace(/\s+/g, "-").toLowerCase()}`;
                  return (
                    <div key={index} id={cardId} className="w-full">
                      {/* clickable header card */}
                      <div
                        className="project-card cursor-pointer w-full"
                        onClick={() => openProject(project)}
                      >
                        <div className="project-name flex items-center justify-between w-full">
                          <span>{project.name}</span>
                          <span className="text-sm text-gray-500">{isOpen ? "▲" : "▼"}</span>
                        </div>
                      </div>

                      {/* inline detail right below the card */}
                      {isOpen && (
                        <section className="project-detail block fade-in mt-3">
                          <h3 className="text-xl font-semibold mb-3">{project.name}</h3>

                          {project.overview && (
                            <>
                              <h4 className="text-base font-semibold mt-2 mb-1">概要</h4>
                              <p className="mb-3 whitespace-pre-line">{project.overview}</p>
                            </>
                          )}

                          {project.name === "Analyze Documents" && (
                            <div className="mb-2">
                              <div
                                className="w-full cursor-zoom-in rounded-lg overflow-hidden h-72 sm:h-96 md:h-[28rem]"
                                onClick={() => openImage("/image/main-page.png")}
                                title="クリックで拡大"
                              >
                                <Image
                                  src="/image/main-page.png"
                                  alt="Analyze Documents メイン画面"
                                  width={960}
                                  height={540}
                                  className="block w-full h-full object-contain"
                                />
                              </div>
                              <div
                                className="w-full cursor-zoom-in rounded-lg overflow-hidden h-72 sm:h-96 md:h-[28rem] mt-3"
                                onClick={() => openImage("/image/system.png")}
                                title="クリックで拡大"
                              >
                                <Image
                                  src="/image/system.png"
                                  alt="Analyze Documents システム構成図"
                                  width={1200}
                                  height={800}
                                  className="block w-full h-full object-contain"
                                />
                              </div>
                              <div className="text-xs text-gray-500 mt-0">画像クリックで拡大表示</div>
                            </div>
                          )}

                          {project.background && (
                            <>
                              <h4 className="text-base font-semibold mt-2 mb-1">背景</h4>
                              <p className="mb-3 whitespace-pre-line">{project.background}</p>
                            </>
                          )}

                          {project.problem && (
                            <>
                              <h4 className="text-base font-semibold mt-2 mb-1">課題</h4>
                              <p className="mb-3 whitespace-pre-line">{project.problem}</p>
                            </>
                          )}

                          {project.role && (
                            <>
                              <h4 className="text-base font-semibold mt-2 mb-1">役割</h4>
                              <p className="mb-3 whitespace-pre-line">{project.role}</p>
                            </>
                          )}

                          {project.approach && (
                            <>
                              <h4 className="text-base font-semibold mt-2 mb-1">工夫ポイント / アプローチ</h4>
                              <p className="mb-3 whitespace-pre-line">{project.approach}</p>
                            </>
                          )}

                          {project.outcome && (
                            <>
                              <h4 className="text-base font-semibold mt-2 mb-1">成果</h4>
                              <p className="mb-3 whitespace-pre-line">{project.outcome}</p>
                            </>
                          )}

                          {project.learnings && (
                            <>
                              <h4 className="text-base font-semibold mt-2 mb-1">学び</h4>
                              <p className="mb-4 whitespace-pre-line">{project.learnings}</p>
                            </>
                          )}

                          {project.github && (
                            <p className="mb-4">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                {project.github}
                              </a>
                            </p>
                          )}

                          <button
                            onClick={(e) => { e.stopPropagation(); clearProject(project); }}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition"
                          >
                            ✕ Close
                          </button>
                        </section>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

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
          <p>2003年生まれ</p>
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
      {isImageOpen && imageSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2"
          onClick={closeImage}
        >
          <div
            className="relative w-full max-w-7xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageSrc}
              alt="プレビュー"
              width={1600}
              height={900}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); closeImage(); }}
            className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full px-3 py-1 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>
      )}
    </main>
  );
}