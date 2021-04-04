const projectId = "cbjsv7wi";
const dataset = "production";

const BASE_URL = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}`;

const getData = (query) => {
  const url = `${BASE_URL}?query=${encodeURIComponent(query)}`;
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result);
};
getData.operation = "READ";
getData.idFrom = (response) => response.query;

export { getData };
