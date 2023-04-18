const axios = require('axios');

const searchPackage = async (req, res, next) => {
  const query = req.query.packageName;
  const endpoint = `https://registry.npmjs.org/-/v1/search?text=${query}`;
  const { data: searchedData } = await axios.get(endpoint);

  const newData = searchedData?.objects?.map((data) => {
    const commonData = data?.package;
    return {
      name: commonData?.name,
      description: commonData?.description,
      version: commonData?.version,
    };
  });
  res.json({ message: newData });
};

module.exports = searchPackage;
