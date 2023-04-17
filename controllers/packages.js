const { supabase } = require('../config/SupabaseClient');
const axios = require('axios');
const http = require('http');
const getAllPackages = async (req, res, next) => {
  const { data, error } = await supabase.from('npm-modules').select();
  const packageData = data.map((e) => ({
    versions: e.version,
    currentVersion: e?.current_version,
    readMe: e?.readme,
    name: e?.name,
    description: e?.description,
    keywords: e?.keywords,
    liscense: e?.liscense,
    maintainers: e?.maintainers,
    bugs: e?.bugs,
  }));
  res.json({ allPackageData: packageData });
};

const getPackage = async (req, res, next) => {
  const packageName = req.params.packageName;
  const { data, error } = await supabase
    .from('npm-modules')
    .select()
    .eq('name', packageName)
    .single();

  if (data !== null) {
    res.json({ packageData: data });
  } else {
    const { data: newData } = await axios.get(
      `https://registry.npmjs.org/${packageName}`
    );
    const { data, error } = await supabase.from('npm-modules').insert({
      versions: newData?.versions,
      current_version: newData['dist-tags']?.latest,
      readme: newData?.readme,
      name: newData?.name,
      description: newData?.description,
      keywords: newData?.keywords,
      license: newData?.license,
      maintainers: newData?.maintainers,
      bugs: newData?.bugs,
    });
    return res.json({ packageData: newData });
  }
};

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

module.exports = { getAllPackages, getPackage, searchPackage };

