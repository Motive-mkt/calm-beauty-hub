import Stamps from "./Stamps";

// Static, server-rendered loyalty card. Women's and men's rewards are shown together with equal weight.
export default function StampCard({ animate = true }: { animate?: boolean }) {
  return (
    <div className="card" data-burst role="group" aria-label="Calm Beauty Hub loyalty card">
      <div className="card__head">
        <span className="card__brand">Calm Beauty Hub</span>
        <span className="card__kind">Loyalty card</span>
      </div>

      <Stamps filled={4} animate={animate} label="Four paid visits stamped. Your fifth visit earns a free bonus service." />

      <p className="card__line">
        Your 5th visit, <strong>on us</strong>
      </p>

      <div className="card__rewards">
        <div className="card__reward">
          <span className="card__for">Women</span>
          <span className="card__name">Free nail art</span>
        </div>
        <div className="card__reward">
          <span className="card__for">Men</span>
          <span className="card__name">Free facial scrub</span>
        </div>
      </div>
    </div>
  );
}
