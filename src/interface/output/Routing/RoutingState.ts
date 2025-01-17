import { RoutingInfo, RoutingList } from "./RoutingList";

export interface RoutingState {
    routingList: RoutingList[],
    isLoading: boolean;
    error: string | null;
    routingInfo: RoutingInfo | null;
}