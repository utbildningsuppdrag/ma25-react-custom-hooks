import './seenCounter.css';

const SeenCounter = ({ seen, total }) => {
    return (
        <footer className="seen-counter">
            <p>
                Seen: <strong>{seen} / {total}</strong>
            </p>

            <p>Kanto</p>
        </footer>
    );
};

export default SeenCounter;