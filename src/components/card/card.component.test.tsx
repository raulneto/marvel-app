import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { CardComponent } from './card.component';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

test('CardComponent render', () => {
    const mockFavouriteComicFn = jest.fn();
	const component = shallow(
        <CardComponent 
            id="123" 
            image="image" 
            isFavourite={false}
            setFavouriteComic={mockFavouriteComicFn}
            title="title"
        />
    );

	expect(toJson(component)).toMatchSnapshot();
    
    component.find('.favourite').simulate('click');
    expect(mockFavouriteComicFn.mock.calls.length).toEqual(1);
});
