const ContentBasedRecommender = require('content-based-recommender')


module.exports.ContentBasedRecommender function(dataset,bookId) {

	const recommender = new ContentBasedRecommender({
	minScore: 0.1,
	maxSimilarDocuments: 100
});

	const dataset = dataset;

	recommender.train(dataset);

	const similarDocument = recommender.getSimilarDocuments(bookId, 0,6);

	return similarDocument;
}

