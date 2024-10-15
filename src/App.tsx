import { QueryClient, QueryClientProvider } from 'react-query';

import UsersCardsGrid from 'components/CardsGrid';

import styles from './styles.module.scss';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.main}>
        <UsersCardsGrid />
      </main>
    </QueryClientProvider>
  );
};

export default App;
