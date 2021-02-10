import { ApolloError, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { SW_QUERIES } from '../../../client/client_queries';

type UseDeck = <T>(
  suite: string,
) => {
  loading: boolean;
  deck: T[];
  errors: { apollo: ApolloError; game: Error };
  compField: keyof T;
};

const useDeck: UseDeck = (suit: string) => {
  const [deck, setDeck] = useState(null);
  const [compField, setCompField] = useState();
  const [errors, setErrors] = useState({ apollo: null, game: null });
  const { loading, data, error: apolloError } = useQuery(SW_QUERIES[suit].query);

  useEffect(() => {
    setErrors((errors) => ({ ...errors, apollo: apolloError }));
  }, [apolloError]);

  useEffect(() => {
    if (loading || apolloError) return;
    setCompField(SW_QUERIES[suit].compField);
    const records = SW_QUERIES[suit].selector(data);

    !data || !records || records.length < 2
      ? setErrors((errors) => ({
          ...errors,
          game: new RangeError('Could not find enough records for a game.'),
        }))
      : setDeck(records);
  }, [suit, loading, apolloError, data]);

  return { loading, errors, deck, compField };
};

export default useDeck;
