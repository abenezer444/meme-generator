import React from "react";

export default function Meme() {
  const [allMemes, setResource] = React.useState({});
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    memeImg: "http://i.imgflip.com/1bij.jpg",
  });

  function getMemeImage() {
    const memesArray = allMemes.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    let memeUrl = memesArray[randomNumber].url;
    setMeme((prev) => ({ ...prev, memeImg: memeUrl }));
  }
  function handleChange(event) {
    setMeme((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setResource(data));
  }, []);

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image
        </button>
      </div>
      <div className="image-container">
        <p className="topText">{meme.topText}</p>
        <img src={meme.memeImg} alt="funny meme" className="meme-img" />
        <p className="bottomText">{meme.bottomText}</p>
      </div>
    </main>
  );
}
