import { Anchor as A, CopyValueButton } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { getImageSizes } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { urls as carbonmarkUrls } from "lib/constants";
import { CategoryName, Project } from "lib/types/carbonmark.types";
import Image from "next/image";
import carbonmarkLogo from "public/carbonmark.svg";
import Moss from "public/category/MOSS.jpeg";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  isMossOffset: boolean;
  category: CategoryName | null;
  description: Project["description"] | null;
  retirement: Partial<KlimaRetire & { category: CategoryName }>;
};

export const ProjectDetails: FC<Props> = (props) => {
  const isMossOffset =
    props?.retirement?.retire?.credit.bridgeProtocol === "MOSS";
  const description = isMossOffset ? (
    <Trans id="retirement.single.moss_offset.description">
      MC02 credits are generated by projects that preserve the Amazon Forest,
      with all sorts of positive externalities such as the creation of local
      jobs and preservation of local biodiversity. Explore MCO2 on{" "}
      <A href={urls.carbonDashboard}>data.klimadao.finance</A>.
    </Trans>
  ) : props.description ? (
    props.description
  ) : null;
  return (
    <>
      <div className={styles.projectDetails}>
        <Text t="h4" color="lighter">
          <Trans id="retirement.single.project_details.title">
            Project Details
          </Trans>
        </Text>
        <div className={styles.imageWrapper}>
          <div className={styles.placeholder}>
            {isMossOffset ? (
              <Image
                fill
                src={Moss}
                alt={t`Moss`}
                style={{ objectFit: "cover" }}
                sizes={getImageSizes({
                  desktopLarge: "1116px",
                })}
              />
            ) : (
              <ProjectImage category={props?.category ?? "Other"} />
            )}
          </div>
        </div>
        <div className={styles.textGroup}>
          <Text t="button" color="lightest">
            <Trans id="retirement.single.project_name.title">
              Project Name
            </Trans>
          </Text>
          <Text>
            {isMossOffset ? (
              <Trans id="retirement.single.moss_offset.name">
                MOSS Earth MC02
              </Trans>
            ) : (
              props?.retirement?.retire?.credit.project.name
            )}
          </Text>
        </div>
        {description && (
          <div className={styles.textGroup}>
            <Text t="button" color="lightest">
              <Trans id="retirement.single.project_description.title">
                Description
              </Trans>
            </Text>
            <Text as="span" className="description">
              {description}
            </Text>
          </div>
        )}

        {props?.retirement?.retire?.credit && (
          <A
            className={styles.profileLink}
            href={
              isMossOffset
                ? "https://mco2token.moss.earth/"
                : `${carbonmarkUrls.projects}/${props.retirement.retire?.credit.project.projectID}-${props.retirement.retire?.credit.vintage}`
            }
          >
            {t`Learn More`}
            <LaunchIcon />
          </A>
        )}
      </div>
      <div className={styles.officialText}>
        <Image
          width={42}
          height={42}
          src={carbonmarkLogo}
          alt="Carbonmark Logo"
        />
        <Text t="body2" color="lightest">
          <Trans id="retirement.single.official_certificate.title">
            Official Certificate for On-Chain Carbon Retirement Provided by{" "}
            <A href={urls.carbonmark}>Carbonmark.com</A>
          </Trans>
        </Text>
      </div>
      <Text t="body2" color="lightest">
        <Trans id="retirement.single.immutable_public_records.title">
          This represents the permanent retirement of a digital carbon asset.
          This retirement and the associated data are immutable public records.
        </Trans>
      </Text>
      <div className={styles.buttons}>
        <CopyValueButton
          shape="default"
          label="Copy Link"
          iconPos="prefix"
          variant="transparent"
          className="copyButton"
        />
        {props.retirement?.retire?.hash && (
          <CarbonmarkButton
            icon={<LaunchIcon />}
            target="_blank"
            variant="transparent"
            rel="noopener noreferrer"
            label={t({
              id: "retirement.single.view_on_polygon_scan",
              message: "View on Polygonscan",
            })}
            href={`https://polygonscan.com/tx/${props.retirement?.retire.hash}`}
          />
        )}
      </div>
    </>
  );
};
