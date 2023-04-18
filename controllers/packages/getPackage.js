const { supabase } = require('../../config/SupabaseClient');
const axios = require('axios');

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

module.exports = getPackage;
