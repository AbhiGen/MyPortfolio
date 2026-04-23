'use client';

import Image from 'next/image';

/**
 * Stats section component showing GitHub and LeetCode metrics.
 * @param {Object} props - Component props.
 * @param {Object} props.githubStats - Live GitHub stats.
 * @param {Object} props.leetcodeStats - Live LeetCode stats.
 * @param {string} props.githubUser - GitHub username.
 * @param {string} props.leetcodeUser - LeetCode username.
 */
export default function Stats({ githubStats, leetcodeStats, githubUser, leetcodeUser }) {
  return (
    <section id="stats" className="fade-up" aria-labelledby="stats-heading" style={{ marginBottom: '6rem' }}>
      <div className="section-head">
        <p className="section-subtitle">Metrics</p>
        <h2 id="stats-heading" className="section-title">Live Statistics</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* GitHub Card */}
        <div className="stat-card" data-tilt data-tilt-max="3" style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--glass-border)', backdropFilter: 'var(--glass-blur)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>
            <Image src="/assests/github.png" alt="GitHub" width={26} height={26} /> GitHub — {githubUser}
          </h3>
          {githubStats.loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '3rem', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '2.5rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>{githubStats.repos}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Public Repos</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '2.5rem', color: 'var(--accent-blue)', margin: 0, fontWeight: 700 }}>{githubStats.followers}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Followers</p>
                </div>
              </div>
              <div className="github-chart">
                <img src={`https://ghchart.rshah.org/${githubUser}`} alt="GitHub contribution chart" />
              </div>
            </>
          )}
        </div>

        {/* LeetCode Card — Full Custom Stats */}
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--glass-border)', backdropFilter: 'var(--glass-blur)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem', fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
            LeetCode — {leetcodeUser}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--glass-bg-hover)', borderRadius: '14px', padding: '1.2rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>{leetcodeStats.totalSolved}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Total Solved</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>/3907</div>
            </div>
            <div style={{ background: 'var(--glass-bg-hover)', borderRadius: '14px', padding: '1.2rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>{leetcodeStats.easy}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Easy</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>/938</div>
            </div>
            <div style={{ background: 'var(--glass-bg-hover)', borderRadius: '14px', padding: '1.2rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>{leetcodeStats.medium}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Medium</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>/2045</div>
            </div>
            <div style={{ background: 'var(--glass-bg-hover)', borderRadius: '14px', padding: '1.2rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>{leetcodeStats.hard}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Hard</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>/924</div>
            </div>
            <div style={{ background: 'var(--glass-bg-hover)', borderRadius: '14px', padding: '1.2rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>161,502</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Global Rank</div>
            </div>
            <div style={{ background: 'var(--glass-bg-hover)', borderRadius: '14px', padding: '1.2rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>1,332</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Contest Rating</div>
            </div>
            <div style={{ background: 'var(--glass-bg-hover)', borderRadius: '14px', padding: '1.2rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>180</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Active Days</div>
            </div>
            <div style={{ background: 'var(--glass-bg-hover)', borderRadius: '14px', padding: '1.2rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>38</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Max Streak</div>
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>630</span> submissions in the past year &nbsp;·&nbsp; Top <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>95.31%</span> globally &nbsp;·&nbsp; <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>4</span> Badges
          </p>

          <a
            href={`https://leetcode.com/u/${leetcodeUser}/`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            style={{ display: 'inline-block', padding: '0.8rem 2rem', fontSize: '0.95rem' }}
          >
            View LeetCode Profile →
          </a>
        </div>
      </div>
    </section>
  );
}
