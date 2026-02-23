
let trainees = [];

fetch('data.json')
.then(res => res.json())
.then(data => trainees = data);

function search() {
const number = document.getElementById("trainingNumber").value.trim();
const trainee = trainees.find(t => t.training_number === number);
const resultDiv = document.getElementById("result");

if (!trainee) {
resultDiv.innerHTML = "<p style='color:red;text-align:center;'>الرقم غير موجود</p>";
return;
}

let html = `
<table class="info-table">
<tr><td><strong>اسم المتدرب</strong></td><td>${trainee.name}</td></tr>
<tr><td><strong>الرقم التدريبي</strong></td><td>${trainee.training_number}</td></tr>
<tr><td><strong>القسم</strong></td><td>${trainee.department}</td></tr>
<tr><td><strong>التخصص</strong></td><td>${trainee.major}</td></tr>
</table>
`;

let trainerName = trainee.schedule.length > 0 ? trainee.schedule[0].trainer : "";

let days = {};
trainee.schedule.forEach(s => {
if (!days[s.day]) days[s.day] = [];
days[s.day].push(s);
});

for (let day in days) {
html += `
<div class="day-box">
<h3 class="day-title">${day}</h3>
<table class="schedule-table">
<tr>
<th>من</th>
<th>إلى</th>
<th>المقرر</th>
<th>القاعة</th>
<th>النوع</th>
</tr>
`;

days[day].forEach(s => {
html += `
<tr>
<td>${s.from}</td>
<td>${s.to}</td>
<td>${s.course}</td>
<td>${s.hall}</td>
<td>${s.type}</td>
</tr>
`;
});

html += `</table></div>`;
}

html += `
<div class="trainer-name">
<strong>اسم المرشد التدريبي:</strong> ${trainerName}
</div>

<div class="footer-note">
احترامك لمواعيد تدريبك يعكس شخصيتك المهنية والانضباطية.
</div>

<div class="print-btn no-print">
<button onclick="window.print()">🖨 طباعة / حفظ PDF</button>
</div>
`;

resultDiv.innerHTML = html;
}
