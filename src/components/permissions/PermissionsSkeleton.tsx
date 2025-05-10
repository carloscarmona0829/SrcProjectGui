import { Box, Skeleton } from "../../adapters";

export default function PermissionsSkeleton() {
  return (
    <Box>
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
