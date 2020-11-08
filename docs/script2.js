let fetchInfo = async () => {
  let id = await window.localStorage.getItem("id");

  let userInfo = await fetch(`https://tt-url.herokuapp.com/api/user/${id}`);
  let data = await userInfo.json();
  let userName = document.querySelector("#userName");
  userName.innerHTML = "Welcome " + data.user.name.toUpperCase() + " !!";
};

fetchInfo();

let handleSubmit = async () => {
  let url = document.querySelector("#url").value;
  let id = await window.localStorage.getItem("id");
  if (!url) return;

  try {
    let response = await fetch(`https://tt-url.herokuapp.com/api/user/${id}`, {
      method: "POST",
      body: JSON.stringify({
        oldUrl: url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    alert(responseData.message);
    // console.log(responseData);
  } catch (error) {
    console.log("Could not fetch at this moment");
  }
};

let getAllUrls = async () => {
  let id = await window.localStorage.getItem("id");

  try {
    let response = await fetch(
      `https://tt-url.herokuapp.com/api/user/url/${id}`
    );
    let responseData = await response.json();
    console.log(responseData.urls);
    let longUrls = document.querySelector("#longurl");
    let ShortUrls = document.querySelector("#shorturl");
    let clicks = document.querySelector("#clicks");
    let container = document.querySelector(".container1");
    longUrls.innerHTML = "";
    ShortUrls.innerHTML = "";
    clicks.innerHTML = "";
    container.innerHTML = "";
    for (let i = 0; i < responseData.urls.length; i++) {
      let long = createDiv(
        responseData.urls[i].oldUrl,
        responseData.urls[i].oldUrl
      );
      let short = createDiv(
        responseData.urls[i].shortUrl,
        responseData.urls[i].oldUrl
      );
      let click = createDiv(responseData.urls[i].clicks);
      let row = document.createElement("div");
      row.className = "row";
      long.className = "col-6";
      short.className = "col-4";
      click.className = "col-2";
      row.append(long, short, click);
      container.appendChild(row);
    }
  } catch (err) {
    console.log(error);
  }
};

function createDiv(url, old) {
  let div = document.createElement("div");
  let a = document.createElement("a");
  // a.setAttribute("href", old);
  // console.log(url);
  a.setAttribute("href", url);
  if (url != old) {
    a.setAttribute("counting", url);
  } else {
    a.setAttribute("counting", "");
  }
  a.innerHTML = url;
  a.setAttribute("target", "_blank");
  // div.className = "col-12";
  div.appendChild(a);
  return div;
}

document.addEventListener("click", async (event) => {
  if (!event.target) return;
  let url = event.target.getAttribute("counting");
  if (!url) return;

  try {
    let response = await fetch(
      `https://tt-url.herokuapp.com/api/url/increment`,
      {
        method: "POST",
        body: JSON.stringify({
          url: url,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.log(error);
  }
});

let everyUrl = async () => {
  try {
    let response = await fetch("https://tt-url.herokuapp.com/api/url");
    let responseData = await response.json();
    let longUrls = document.querySelector("#longurl");
    let ShortUrls = document.querySelector("#shorturl");
    let clicks = document.querySelector("#clicks");
    longUrls.innerHTML = "";
    ShortUrls.innerHTML = "";
    clicks.innerHTML = "";
    for (let i = 0; i < responseData.urls.length; i++) {
      let long = createDiv(
        responseData.urls[i].oldUrl,
        responseData.urls[i].oldUrl
      );
      let short = createDiv(
        responseData.urls[i].shortUrl,
        responseData.urls[i].oldUrl
      );
      let click = createClickDiv(responseData.urls[i].clicks);
      longUrls.appendChild(long);
      ShortUrls.appendChild(short);
      clicks.appendChild(click);
    }
  } catch (err) {
    console.log(error);
  }
};

function createClickDiv(data) {
  let div = document.createElement("div");
  div.className = "col-12";
  div.innerHTML = data;
  return div;
}
