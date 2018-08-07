class Grid{
	constructor(t, c, r) {
		this.width = c;
		this.height = r;
		this._grid = [];
		for (var x=0; x < c; x++) {
			this._grid.push([]);
			for (var y=0; y < r; y++) {
				this._grid[x].push(t);
			}
		}
	}

	set(val, x, y) {
		this._grid[x][y] = val;
	}

	get(x, y) {
		return this._grid[x][y];
	}
}
