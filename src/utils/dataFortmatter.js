export function timeConverter(UNIX_timestamp) {
	let a = new Date(UNIX_timestamp * 1000);
	let month = (a.getMonth() + 1 < 10 ? "0" : "") + (a.getMonth() + 1);
	let date = (a.getDate() < 10 ? "0" : "") + a.getDate();
	let hour = a.getHours();
	let min = a.getMinutes() + (a.getMinutes() < 10 ? "0" : "");
	return hour + ":" + min + " " + date + "/" + month;
}

export const vnExpressDataFormatter = (data) => {
  const lines = data.split("\n");
  return lines.slice(2, lines.length - 1).map((l) => ({
    date: l.split('","')[0].slice(1),
    community: l.split('","')[1],
    totalCommunity: l.split(",")[2],
    deaths: l.split('","')[6],
    recovered: l.split('","')[7],
    cases: l.split('","')[8],
    totalCase: l.split('","')[9],
    totalDeath: l.split('","')[10],
    totalRecovered: l.split('","')[11],
    totalRecovered2020: l.split('","')[24],
    totalDeath2020: l.split('","')[23],
    totalCases2020: l.split('","')[22],
    activeCases: l.split('","')[21],
  }));
};