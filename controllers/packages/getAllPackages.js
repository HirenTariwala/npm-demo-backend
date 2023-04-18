const { supabase } = require('../../config/SupabaseClient');

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

module.exports = getAllPackages;
