import { useState } from "react";
import { useParams } from "react-router-dom";

const Details = ({
    games,
    addComment
}) => {
    const [comment, setComment] = useState({
        username: '',
        content: '',
    });

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const { gameId } = useParams();
    const game = games.find(x => x._id == gameId);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const commentToSend = `${comment.username}: ${comment.content}`;
        addComment(gameId, commentToSend);
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>
                <div className="details-comments">
                    <h2>Comments:</h2>

                    <ul>
                        {game.comments?.map(x => 
                            <li className="comment">
                                <p>{x}</p>
                            </li>
                        )}
                    </ul>

                    {!game.comments && <p className="no-comment">No comments.</p>}
                </div>

                <div className="buttons">
                    <a href="#" className="button">
                        Edit
                    </a>
                    <a href="#" className="button">
                        Delete
                    </a>
                </div>
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={submitFormHandler}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={onChange}
                        value={comment.username}
                    />
                    <textarea
                        name="content"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.content}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section >
    );
}

export default Details;