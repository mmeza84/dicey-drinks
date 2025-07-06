import "./Home.scss";

export default function Home() {
  return (
    <div className="home">
      <h2>
        <a href="/configure">&gt; Configure</a>
        {/* Liquor/Sprit, Mixer, Flair/Addin */}
      </h2>
      <div> - OR - </div>
      <h2>
        <a href="/roll">&gt; Roll A Drink!</a>
      </h2>
    </div>
  );
}
