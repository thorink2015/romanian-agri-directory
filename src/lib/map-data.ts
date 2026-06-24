import { counties } from '@/data/counties';
import { moldovaRegions } from '@/data/regions-moldova';
import { getOperatorsByCounty, getOperatorsByRaion } from '@/data/operators';
import type { MapRegionInfo, MapOperator } from '@/components/map/OperatorMap';

export interface MapData {
  regions: Record<string, MapRegionInfo>;
  operatorsByRegion: Record<string, MapOperator[]>;
}

export function getRomaniaMapData(): MapData {
  const regions: Record<string, MapRegionInfo> = {};
  const operatorsByRegion: Record<string, MapOperator[]> = {};
  for (const c of counties) {
    const ops = getOperatorsByCounty(c.slug);
    regions[c.slug] = { name: c.name, count: ops.length, href: `/judete/${c.slug}` };
    operatorsByRegion[c.slug] = ops.map((o) => ({
      slug: o.slug,
      name: o.shortName || o.name,
      city: o.city,
    }));
  }
  return { regions, operatorsByRegion };
}

export function getMoldovaMapData(): MapData {
  const regions: Record<string, MapRegionInfo> = {};
  const operatorsByRegion: Record<string, MapOperator[]> = {};
  for (const r of moldovaRegions) {
    const ops = getOperatorsByRaion(r.slug);
    regions[r.slug] = { name: r.name, count: ops.length, href: `/moldova/${r.slug}` };
    operatorsByRegion[r.slug] = ops.map((o) => ({
      slug: o.slug,
      name: o.shortName || o.name,
      city: o.city,
    }));
  }
  return { regions, operatorsByRegion };
}
