import { useMemo, useState } from 'react';
import { ArrowRight, Check, MapPin, Sparkles } from 'lucide-react';

function YenzaPreview() {
  const options = [
    ['Plan', 'Turn the goal into a clear, structured action plan.'],
    ['Write', 'Draft useful content and refine it in the same workspace.'],
    ['Create', 'Generate working files and content from the conversation.'],
  ];
  const [active, setActive] = useState(0);
  return <div className="experience-app yenza-experience"><div className="experience-toolbar"><span className="traffic"><i></i><i></i><i></i></span><strong>Yenza AI workspace</strong><span>Preview</span></div><div className="yenza-layout"><aside><b>Project</b><span>Product launch</span><span>Research</span><span>Files</span></aside><div className="yenza-chat"><div className="assistant-bubble"><Sparkles size={16}/><p>{options[active][1]}</p></div><div className="prompt-options">{options.map(([label], index)=><button key={label} className={active===index?'active':''} onClick={()=>setActive(index)}>{label}</button>)}</div><div className="fake-input">Ask Yenza anything… <ArrowRight size={16}/></div></div></div></div>;
}

function TaxiPreview() {
  const [searched, setSearched] = useState(false);
  return <div className="experience-app taxi-experience"><div className="experience-toolbar"><strong>TaxiFind route discovery</strong><span>Preview</span></div><div className="route-form"><label>From<span>Johannesburg CBD</span></label><div className="route-line"></div><label>To<span>Sandton</span></label><button onClick={()=>setSearched(true)}>Find route</button></div><div className={`route-result ${searched?'show':''}`}><div><MapPin size={17}/><b>Suggested journey</b></div><p>Start at a central rank, confirm the Sandton route and follow the rank guidance shown in the product.</p><span>Community information can improve over time.</span></div></div>;
}

function KitchPreview() {
  const [tasks, setTasks] = useState([true, false, false, true]);
  const labels = ['Opening checks', 'Prep list', 'Temperature log', 'Closing handover'];
  const completed = tasks.filter(Boolean).length;
  return <div className="experience-app kitch-experience"><div className="experience-toolbar"><strong>KitchCore daily board</strong><span>{completed}/{tasks.length} complete</span></div><div className="kitch-progress"><span style={{width:`${completed/tasks.length*100}%`}}></span></div><div className="kitch-list">{labels.map((label,index)=><button key={label} onClick={()=>setTasks(items=>items.map((value,i)=>i===index?!value:value))} className={tasks[index]?'done':''}><i>{tasks[index]&&<Check size={13}/>}</i><span>{label}</span></button>)}</div></div>;
}

function WhatsPreview() {
  const data = useMemo(()=>({Eat:['Lunch nearby','Coffee','Takeaway'],Go:['Parks','Things to do','Local spots'],Shop:['Groceries','Essentials','Nearby stores']}),[]);
  const [category,setCategory]=useState('Eat');
  return <div className="experience-app whats-experience"><div className="experience-toolbar"><strong>What’s There?</strong><span>Nearby preview</span></div><div className="whats-location"><MapPin size={16}/> Johannesburg <span>Current area</span></div><div className="whats-tabs">{Object.keys(data).map(item=><button className={item===category?'active':''} onClick={()=>setCategory(item)} key={item}>{item}</button>)}</div><div className="place-list">{data[category].map((item,index)=><div key={item}><i>{index+1}</i><span><b>{item}</b><small>Explore nearby options</small></span><ArrowRight size={15}/></div>)}</div></div>;
}

export default function ProductExperience({ slug }) {
  if (slug === 'yenza-ai') return <YenzaPreview />;
  if (slug === 'taxifind') return <TaxiPreview />;
  if (slug === 'kitchcore') return <KitchPreview />;
  return <WhatsPreview />;
}
