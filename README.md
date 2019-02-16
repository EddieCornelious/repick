# Repick

Selector library for Jeux

## Installation

```bash
npm install repick
```

## Usage

If you have an expensive function that you only want to call if some certain values change, then create a memoized selector
to avoid unnecessary function calls.
In the example below, if you are using React and Jeux or Redux, get visible todos might be wwrapped in a map state to props function
like so.

```javascript
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```
Ths issue with the code above is that map state to props will be invoked under the hood everytime the app state changes and the
function that handles the todo filter states below will be invoked which can become expensive. With a memoized selector,
the expensive method will only be called when todos or the visibility filter changes, not some other part of the app state.


```javascript
import { createSelector } from 'repick'

const state = {
    visibilityFilter : "SHOW_ALL",
    auth: true,
    todos: []
}

const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)