exports.getOverview = (req, res, next) => {
  res.status(200).render('overview', {
    title: 'All tours',
  });
};

exports.getTours = (req, res, next) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker tour',
  });
};
