export const GoToNextPage = (CollectionsPage,currentPage) => {
		if(currentPage < CollectionsPage / 9) {
			return currentPage+1;
		} else {
			return currentPage;
		}
}

export const GoToPreviousPage = (currentPage) => {
		if(currentPage > 1) {
			return currentPage-1;
		} else {
			return currentPage;
		}
}