/*
 * Copyright 2017 ING Bank N.V.
 * This file is part of the go-ethereum library.
 *
 * The go-ethereum library is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The go-ethereum library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with the go-ethereum library. If not, see <http://www.gnu.org/licenses/>.
 *
 */

package com.kit.prover.zeroknowledge.dto;

import java.io.Serializable;
import java.math.BigInteger;

import static com.kit.prover.zeroknowledge.util.BigIntUtil.shortBigInt;

public class SecretOrderGroup implements Serializable {

    /**
     * Large composite that defines a group Z*_N.
     */
    private BigInteger N;

    /**
     * A generator for G, a cyclic subgroup of Z*_N with a large order. The order of this subgroup is secret.
     */
    private BigInteger g;

    /**
     * Element of group generated by g.
     * This is a generator for a subgroup of G with large order, as needed for KDLCGSO.
     */
    private BigInteger h;

    public SecretOrderGroup(BigInteger N, BigInteger g, BigInteger h) {
        this.N = N;
        this.g = g;
        this.h = h;
    }

    public BigInteger getN() {
        return N;
    }

    public BigInteger getG() {
        return g;
    }

    public BigInteger getH() {
        return h;
    }

    @Override
    public String toString() {
        return String.format("SecretOrderGroup(N=%s, g=%s, h=%s",
                shortBigInt(getN()), shortBigInt(getG()), shortBigInt(getH()));
    }
}
