exports.paginate = (query, page, limit) => {
  const skip = (page - 1) * limit;
  return query.skip(skip).limit(limit);
};

exports.getPaginationData = (totalDocs, page, limit) => {
  const totalPages = Math.ceil(totalDocs / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  return {
    currentPage: page,
    totalPages,
    totalDocs,
    limit,
    hasNextPage,
    hasPrevPage
  };
};
