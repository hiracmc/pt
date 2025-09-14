import { forEmoJi } from "./resource/convertEmoji.js";

let data = [
    {
        id: "test",
        name: "効率のいい勉強法を模索中",
        date: 1735657200,
        data: [
            {
                id:0,
                authorId: "ponzu123",
                autnorName: "ぽんず",
                date: 1735657800,
                text: "どうしよう...\n暗記パンを食べても覚えれないし、\n塩コショウをかけても覚えることができないよ...",
                emoji: [{ id: "good", value: 30 },{ id: "thinking", value: 13 }]
            }
        ]

    }
]

function byid(id){return document.getElementById(id)}

const bodys = byid("bodys");

let newHtml = "";
data.forEach(d => {
    const itti = d.data[0]
    let emojidata = "";
    itti.emoji.forEach(e => {
        emojidata += `
        <div class="reac">
            <p>${forEmoJi.get(e.id)} ${e.value}</p>
        </div>
        `
    })
newHtml += `
<div class="card">
    <h2>${d.name}</h2>
      <p style="color: #cfcfcf;">[0] ${itti.autnorName} - @${itti.authorId} :</p>
      <p style="color: #a0a0a0ff;">${itti.text}</p>
      ${emojidata}
    </div>
`
})


bodys.innerHTML = newHtml;


const load = byid("loader");
const loadText = byid("load-text");
if (data.length > 0){
    setTimeout(() => {
  load.classList.add("hide");
  loadText.classList.add("hide");
  setTimeout(() => {
    load.style.display = "none";
    loadText.style.display = "none";
  }, 500);
}, 100);
}

