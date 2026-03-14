import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetBalance() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["balance"],
    queryFn: async () => {
      if (!actor) return "2500.00";
      return actor.getBalance();
    },
    enabled: !!actor && !isFetching,
    initialData: "2500.00",
  });
}

export function useSetBalance() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: string) => {
      if (actor) await actor.setBalance(value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });
}
