import React from 'react';

interface PropTypes<T> {
  loading: boolean;
  errorDetails: string;
  error: boolean;
  list: T[];
  renderItem: (item: T) => React.ReactNode;
}

const showDetails = process.env.NODE_ENV !== 'production';

const List = <T extends unknown>(props: PropTypes<T>) => {
  const { loading, errorDetails, error, list, renderItem } = props;
  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    if (showDetails) {
      return (
        <div>
          <p>something bad happend...</p>
          <p>{errorDetails}</p>
        </div>
      );
    }
    return (
      <div>
        <p>something bad happend...</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="list-inside list-disc">{list.map(renderItem)}</ul>
    </div>
  );
};

export default List;
