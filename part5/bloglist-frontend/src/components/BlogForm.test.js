import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';
import { render, screen } from '@testing-library/react';

describe('<BlogForm />', () => {
  let mockCreateBlog;
  let component;
  beforeEach(() => {
    mockCreateBlog = jest.fn();
    component = render(<BlogForm createBlog={mockCreateBlog} />);
  });

  test('adding a new blog', async () => {
    const user = userEvent.setup();
    const title = component.container.querySelector('#title-input');
    const author = component.container.querySelector('#author-input');
    const url = component.container.querySelector('#url-input');
    const createButton = screen.getByText('create');

    await user.type(title, 'test-title');
    await user.type(author, 'test-author');
    await user.type(url, 'test-url');
    await user.click(createButton);

    expect(mockCreateBlog.mock.calls).toHaveLength(1);
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('test-title');
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('test-author');
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('test-url');
  });
});
