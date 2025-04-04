// 학교알리미 API 코드 업데이트 및 오류 처리 추가
export default async function handler(req, res) {
  const { school, level, region, year } = req.query;

  if (!school || !level || !region || !year) {
    return res.status(400).json({
      error: '학교명, 학교급 코드, 시도교육청 코드, 연도 정보를 모두 입력해주세요.'
    });
  }

  const url = `https://www.schoolinfo.go.kr/openApi.do?apiKey=91464e07fb874c39b7a28ff2356d16b1&apiType=JSON&pbanScCode=${region}&schulKndCode=${level}&SCHUL_NM=${encodeURIComponent(school)}&pbanY=${year}`;
  console.log('[학교알리미 호출 URL]', url); // <- 이 줄 추가

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: '학교알리미 API 호출 중 오류 발생',
      details: err.message
    });
  }
}
