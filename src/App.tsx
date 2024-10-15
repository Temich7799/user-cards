import { QueryClient, QueryClientProvider } from 'react-query';

import UsersCardsGrid from 'components/UsersCardsGrid';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersCardsGrid />
    </QueryClientProvider>
  );
};

export default App;
