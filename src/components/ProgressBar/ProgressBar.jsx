import './ProgressBar.scss';

const ProgressBar = ({ total = 0, current = 0 }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__progress"
        style={{ width: `${total === 0 ? 0 : (current / total) * 100}%` }}>
        <span>
          {current}/{total}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
