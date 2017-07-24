import React from 'react';
import _ from 'lodash';
import Renderer from 'react-test-renderer/shallow';
import TU from 'react-dom/test-utils';
import FiltersPanel from 'components/challenge-listing/Filters/FiltersPanel';

const onSaveFilter = jest.fn();
const selectCommunity = jest.fn();
const setFilterState = jest.fn();
const setSearchText = jest.fn();
const onClose = jest.fn();

const mockDatas = [{
  communityFilters: [{}],
  filterState: {},
  hidden: true,
  onSaveFilter,
  selectCommunity,
  selectedCommunityId: '1',
  setFilterState,
  setSearchText,
  validKeywords: ['key', 'word'],
  validSubtracks: ['sub', 'track'],
  onClose,
}, {
  communityFilters: [{}],
  filterState: {},
  hidden: false,
  onSaveFilter,
  selectCommunity,
  selectedCommunityId: '1',
  setFilterState,
  setSearchText,
  validKeywords: [],
  validSubtracks: [],
  onClose,
}];

test('Matches shallow shapshot', () => {
  const renderer = new Renderer();

  _.forEach(mockDatas, (data) => {
    renderer.render((
      <FiltersPanel {...data} />
    ));
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});

class Wrapper extends React.Component {
  componentDidMount() {}

  render() {
    return <FiltersPanel {...this.props} />;
  }
}

test('handle events', () => {
  const instance = TU.renderIntoDocument((<Wrapper {...mockDatas[0]} />));
  const matches = TU.scryRenderedDOMComponentsWithTag(instance, 'button');
  expect(matches).toHaveLength(2);

  TU.Simulate.click(matches[0]);
  expect(setFilterState).toHaveBeenCalledTimes(1);
  expect(setSearchText).toHaveBeenCalledTimes(1);

  TU.Simulate.click(matches[1]);
  expect(onSaveFilter).toHaveBeenCalledTimes(1);
});

