export default function ProductMiniVisual({ slug }) {
  if (slug === 'yenza-ai') return (
    <div className="mini-ui mini-yenza" aria-hidden="true"><div className="mini-top"><i></i><i></i><i></i><span>Yenza AI</span></div><div className="mini-chat"><b>How can I help?</b><span>Build, write, analyse or create.</span><div className="mini-prompt">Create a project plan</div></div></div>
  );
  if (slug === 'taxifind') return (
    <div className="mini-ui mini-taxi" aria-hidden="true"><div className="mini-route"><span>Johannesburg CBD</span><em></em><span>Sandton</span></div><div className="mini-map"><i></i><i></i><i></i><b>Route found</b></div></div>
  );
  if (slug === 'kitchcore') return (
    <div className="mini-ui mini-kitch" aria-hidden="true"><div className="mini-stat"><b>8</b><span>today</span></div><div className="mini-tasks"><i></i><i></i><i></i><i></i></div><div className="mini-progress"><span></span></div></div>
  );
  return (
    <div className="mini-ui mini-whats" aria-hidden="true"><div className="mini-search">What’s near me?</div><div className="mini-places"><span>Eat</span><span>Go</span><span>Shop</span></div><div className="mini-near"><i></i><i></i><i></i></div></div>
  );
}
