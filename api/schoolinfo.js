const { school, level, region, year } = req.query;

if (!school || !level || !region || !year) {
  return res.status(400).json({
    error: '학교명, 학교급 코드, 시도교육청 코드, 연도 정보를 모두 입력해주세요.'
  });
}
  const encodedSchool = encodeURIComponent(school);
  const apiKey = "91464e07fb874c39b7a28ff2356d16b1";
  const url = `https://www.schoolinfo.go.kr/openApi.do?apiKey=${apiKey}&apiType=JSON&pbanScCode=${region}&schulKndCode=${level}&SCHUL_NM=${encodedSchool}&pbanY=${year}`;

  console.log("[API 호출 URL]", url); // 로그 출력 확인용

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
Fix: Add 'year' param to schoolinfo API URL
