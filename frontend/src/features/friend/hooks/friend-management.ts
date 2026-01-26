import { useAlert } from "@/components/feedback/alert";

import { useSession } from "@/features/auth/hooks/session";
import {
    acceptFriendship,
    declineFriendship,
    removeFriendship,
    requestFriendship
} from "@/features/friend/utils/api";

export interface FriendManagementController {
    handleAddFriend: (partnerId: string) => void;
    handleAcceptRequest: (partnerId: string) => void;
    handleDeclineRequest: (partnerId: string) => void;
    handleRemoveFriend: (partnerId: string) => void;
}

export function useFriendManagement(
    onChange?: () => void
): FriendManagementController {
    const alert = useAlert();
    const session = useSession();

    if (!session.loggedUser) {
        throw new Error("No logged user in session.");
    }

    const loggedUser = session.loggedUser;

    const handleAddFriend = (partnerId: string) => {
        requestFriendship(session, loggedUser.id, partnerId)
            .then((success: boolean) => {
                if (success) {
                    alert.showSuccessMessage("Friend request sent successfully.");
                } else {
                    alert.showErrorMessage("Failed to send friend request.");
                }

                if (onChange) {
                    onChange();
                }
            })
            .catch((_: Error) => {
                alert.showErrorMessage("An error occurred while sending friend request.");
            });
    };

    const handleAcceptRequest = (partnerId: string) => {
        acceptFriendship(session, loggedUser.id, partnerId)
            .then((success: boolean) => {
                if (success) {
                    alert.showSuccessMessage("Friend request accepted successfully.");
                } else {
                    alert.showErrorMessage("Failed to accept friend request.");
                }

                if (onChange) {
                    onChange();
                }
            })
            .catch((_: Error) => {
                alert.showErrorMessage("An error occurred while accepting friend request.");
            });
    };

    const handleDeclineRequest = (partnerId: string) => {
        declineFriendship(session, loggedUser.id, partnerId)
            .then((success: boolean) => {
                if (success) {
                    alert.showSuccessMessage("Friend request declined successfully.");
                } else {
                    alert.showErrorMessage("Failed to decline friend request.");
                }

                if (onChange) {
                    onChange();
                }
            })
            .catch((_: Error) => {
                alert.showErrorMessage("An error occurred while declining friend request.");
            });
    };

    const handleRemoveFriend = (partnerId: string) => {
        removeFriendship(session, loggedUser.id, partnerId)
            .then((success: boolean) => {
                if (success) {
                    alert.showSuccessMessage("Friend removed successfully.");
                } else {
                    alert.showErrorMessage("Failed to remove friend.");
                }

                if (onChange) {
                    onChange();
                }
            })
            .catch((_: Error) => {
                alert.showErrorMessage("An error occurred while removing friend.");
            });
    };

    return {
        handleAddFriend,
        handleAcceptRequest,
        handleDeclineRequest,
        handleRemoveFriend
    };
}
