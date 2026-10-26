import React from 'react';
const C = Math.cos(Math.PI / 6);
const S = 0.5;
const INK = '#e91515';
type Point = [number, number];
const P = (x: number, y: number, z = 0): Point => [(x - y) * C, (x + y) * S - z];
const pts = (list: Point[]) => list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ');
const flat = (x: number, y: number, z: number) => {
    const [tx, ty] = P(x, y, z);
    return `matrix(${C} ${S} ${-C} ${S} ${tx} ${ty})`;
};

type SlabProps = {
    x?: number;
    y?: number;
    z?: number;
    w?: number;
    d?: number;
    h?: number;
    dark?: boolean;
    ghost?: boolean;
};

const Slab = ({ x = 0, y = 0, z = 0, w = 40, d = 40, h = 8, dark = false, ghost = false }: SlabProps) => {
    const t = z + h;
    const [x1, x2, y1, y2] = [x - w, x + w, y - d, y + d];
    const p: React.SVGAttributes<SVGPolygonElement> = {
        stroke: ghost ? '#a9a59f' : INK,
        strokeWidth: 1.2,
        strokeLinejoin: 'round',
        strokeDasharray: ghost ? '3 3' : undefined,
    };
    const o = ghost ? 0.55 : 1;
    return (
        <g>
            <polygon {...p} fill="#ebe9e5" fillOpacity={o} points={pts([P(x1, y2, t), P(x2, y2, t), P(x2, y2, z), P(x1, y2, z)])} />
            <polygon {...p} fill="#d9d6d0" fillOpacity={o} points={pts([P(x2, y1, t), P(x2, y2, t), P(x2, y2, z), P(x2, y1, z)])} />
            <polygon {...p} fill={dark ? INK : '#fff'} fillOpacity={o} points={pts([P(x1, y1, t), P(x2, y1, t), P(x2, y2, t), P(x1, y2, t)])} />
        </g>
    );
};

type DropProps = { x: number; y: number; z1: number; z2: number };

const Drop = ({ x, y, z1, z2 }: DropProps) => {
    const [a, b] = P(x, y, z1);
    const [c, e] = P(x, y, z2);
    return <line x1={a} y1={b} x2={c} y2={e} stroke="#8d8982" strokeWidth="1" strokeDasharray="3 3" />;
};

const Art = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <svg viewBox="0 0 360 330" className="h-auto w-full max-w-[400px]" role="img" aria-label={label}>
        {children}
    </svg>
);

const UploadArt = () => (
    <Art label="A PDF document floating above a platform">
        <g transform="translate(180 205)">
            <Slab w={88} d={88} h={14} />
            {[[-42, -56], [42, -56], [-42, 56], [42, 56]].map(([x, y]) => (
                <Drop key={`${x}${y}`} x={x} y={y} z1={14} z2={70} />
            ))}
            <Slab z={70} w={42} d={56} h={4} />
            <g transform={flat(0, 0, 74)}>
                <rect x="-30" y="-44" width="34" height="16" rx="3" fill={INK} />
                <text x="-13" y="-32.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">PDF</text>
                {[-12, 2, 16, 30].map((v, i) => (
                    <line key={v} x1="-30" x2={i === 3 ? 0 : 30} y1={v} y2={v} stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
                ))}
            </g>
            <g transform="translate(45 22)">
                <circle r="21" fill="none" stroke={INK} strokeWidth="1" strokeDasharray="2 3" />
                <circle r="15" fill={INK} />
                <path d="M0 7V-6M-6 0L0 -7L6 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </g>
    </Art>
);

const QuizArt = () => (
    <Art label="Stacked layers turning into a multiple-choice question card">
        <g transform="translate(180 215)">
            <Slab w={86} d={86} h={14} dark />
            <g transform={flat(58, 58, 14)}>
                <text textAnchor="middle" y="9" fontSize="28" fontWeight="700" fill="#fff">?</text>
            </g>
            {[[-60, -60], [60, -60], [-60, 60], [60, 60]].map(([x, y]) => (
                <Drop key={`${x}${y}`} x={x} y={y} z1={14} z2={96} />
            ))}
            <Slab z={40} w={60} d={60} h={3} ghost />
            <Slab z={68} w={60} d={60} h={3} ghost />
            <Slab z={96} w={60} d={60} h={4} />
            <g transform={flat(0, 0, 100)}>
                <rect x="-46" y="-46" width="62" height="5" rx="2.5" fill={INK} />
                <rect x="-46" y="-36" width="38" height="4" rx="2" fill="#bdb9b2" />
                {[-14, 10, 34].map((v, i) => (
                    <g key={v}>
                        <circle cx="-42" cy={v} r="6" fill={i === 1 ? INK : '#fff'} stroke={INK} strokeWidth="1.3" />
                        <line x1="-30" x2="34" y1={v} y2={v} stroke={i === 1 ? INK : '#bdb9b2'} strokeWidth="3" strokeLinecap="round" />
                    </g>
                ))}
            </g>
        </g>
    </Art>
);

const ExplainArt = () => (
    <Art label="An answer card with a check mark and a floating explanation card">
        <g transform="translate(180 210)">
            <Slab w={88} d={88} h={14} />
            {[[-20, -72], [72, -72], [72, 20]].map(([x, y]) => (
                <Drop key={`${x}${y}`} x={x} y={y} z1={14} z2={64} />
            ))}
            <Slab x={-30} y={30} z={14} w={34} d={26} h={6} />
            <g transform={flat(-30, 30, 20)}>
                <circle r="14" fill="#fff" stroke={INK} strokeWidth="1.5" />
                <path d="M-7 0L-2 6L8 -6" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <Slab x={26} y={-26} z={64} w={46} d={46} h={4} />
            <g transform={flat(26, -26, 68)}>
                <rect x="-36" y="-36" width="36" height="14" rx="3" fill={INK} />
                <text x="-18" y="-26" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">WHY</text>
                {[-6, 8, 22, 36].map((v, i) => (
                    <line key={v} x1="-36" x2={i === 3 ? -6 : 36} y1={v} y2={v} stroke="#8d8982" strokeWidth="2.5" strokeLinecap="round" />
                ))}
            </g>
        </g>
    </Art>
);

const ProgressArt = () => {
    const bars: Point[] = [[-48, 20], [-14, 36], [20, 56]];
    const trend = bars.map(([x, h]) => P(x, -24, 14 + h + 16));
    const [lx, ly] = trend[trend.length - 1];
    return (
        <Art label="Rising bars and a score badge">
            <g transform="translate(180 210)">
                <Slab w={88} d={88} h={14} />
                {bars.map(([x, h]) => (
                    <Slab key={x} x={x} y={-24} z={14} w={13} d={13} h={h} />
                ))}
                <polyline points={pts(trend)} fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx={lx} cy={ly} r="4.5" fill={INK} />
                <Slab x={8} y={46} z={14} w={34} d={20} h={10} dark />
                <g transform={flat(8, 46, 24)}>
                    <text textAnchor="middle" y="5" fontSize="15" fontWeight="700" fill="#fff">92%</text>
                </g>
            </g>
        </Art>
    );
};

type Feature = {
    tag: string;
    icon: string;
    title: string;
    accent: string;
    text: string;
    Art: React.ComponentType;
};

const FEATURES: Feature[] = [
    {
        tag: 'Upload',
        icon: 'M12 16V4m0 0L7 9m5-5l5 5M4 20h16',
        title: 'যেকোনো পিডিএফ (PDF) এখানে দিন',
        accent: 'কয়েক সেকেন্ডের মধ্যেই',
        text: 'Lecture notes, textbooks or research papers. Upload your file and we read every page for you.',
        Art: UploadArt,
    },
    {
        tag: 'Quiz Generation',
        icon: 'M9 9a3 3 0 115 2c-1 1-2 1.5-2 3M12 18h.01',
        title: 'আপনার পেজগুলোকে রূপান্তর করুন',
        accent: 'স্মার্ট কুইজে',
        text: 'আপনার docs মূল বিষয়গুলোর ওপর ভিত্তি করে তৈরি বহু-নির্বাচনী প্রশ্ন (MCQ) পান, যা তাৎক্ষণিকভাবে উত্তর দেওয়ার জন্য প্রস্তুত।',
        Art: QuizArt,
    },
    {
        tag: 'Explanations',
        icon: 'M5 5h14v10H9l-4 4z',
        title: 'প্রতিটি উত্তর বুঝে নিন',
        accent: 'স্পষ্ট ব্যাখ্যাসহ',
        text: 'প্রতিটি প্রশ্নেই ব্যাখ্যা করা হয়েছে কেন একটি উত্তর সঠিক; ফলে আপনি কেবল বিকল্পটি মুখস্থ করার পরিবর্তে মূল বিষয়টিই আয়ত্ত করতে পারেন।',
        Art: ExplainArt,
    },
    {
        tag: 'Progress',
        icon: 'M4 20V10m6 10V4m6 16v-7',
        title: 'আপনার স্কোর ট্র্যাক করুন',
        accent: 'এবং দ্রুত উন্নতি করুন',
        text: 'তাত্ক্ষণিকভাবে আপনার ফলাফল দেখুন, যেসব প্রশ্নের উত্তর ভুল হয়েছে সেগুলো পর্যালোচনা করুন এবং যেসব বিষয়ে আরও অনুশীলনের প্রয়োজন, সেগুলো অনুশীলন করুন।',
        Art: ProgressArt,
    },
];

const Pill = ({ icon, children }: { icon: string; children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-1.5  border border-neutral-800 bg-white px-3 py-1 text-xs text-neutral-700 shadow-sm">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={icon} />
        </svg>
        {children}
    </span>
);

const Row = ({ item, flip }: { item: Feature; flip: boolean }) => (
    <div className="relative grid border-b border-neutral-800 md:grid-cols-2">
        <div className={`flex items-center justify-center p-8 md:p-12 ${flip ? 'md:order-2' : ''}`}>
            <item.Art />
        </div>
        <div className="flex flex-col items-start justify-center gap-5 p-8 md:p-14">
            <Pill icon={item.icon}>{item.tag}</Pill>
            <h3 className="text-3xl font-medium leading-tight tracking-tight text-neutral-100 md:text-4xl">
                {item.title}
                <span className="block font-serif italic font-normal">{item.accent}</span>
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-500">{item.text}</p>
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-[3px] left-1/2 z-10 hidden h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-neutral-900 md:block" />
    </div>
);

const Features = () => {
    return (
        <section id="features" className="px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-[1000]">
                <div className="mb-14 flex flex-col items-center gap-4 text-center">
                    <Pill icon="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z">Features</Pill>
                    <h2 className="text-4xl tracking-tight text-neutral-100">
                        একটি পিডিএফ থেকে সম্পূর্ণ কুইজ,
                        <span className="block font-serif italic font-normal">সাথে প্রতিটি উত্তরের explanation</span>
                    </h2>
                </div>

                <div className="relative border-x border-t border-neutral-800">
                    <div aria-hidden="true" className="absolute inset-y-0 left-1/2 hidden w-px bg-neutral-300 md:block" />
                    {FEATURES.map((item, i) => (
                        <Row key={item.tag} item={item} flip={i % 2 === 1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;